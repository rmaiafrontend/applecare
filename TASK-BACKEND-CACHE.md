# Bug: Endpoints retornam dados desatualizados após operações de escrita

## Problema

Após salvar/criar/editar recursos no admin, os endpoints GET continuam retornando dados antigos. O usuário precisa atualizar a página **2 vezes** para ver as alterações.

---

## Caso 1: Configurações da Home / Loja

### Reprodução
1. Admin altera configuração (ex: nome da loja, hero title, etc.)
2. Admin clica "Publicar" → `PUT /api/v1/admin/configuracoes/home` retorna 200 OK
3. Usuário acessa catálogo → `GET /api/v1/lojas/{slug}/configuracoes/home` retorna dados **antigos**
4. Refresh → ainda antigo
5. Segundo refresh → agora atualizado

### Endpoints afetados
- `GET /api/v1/lojas/{slug}/configuracoes/home`
- `GET /api/v1/lojas/{slug}`

---

## Caso 2: Lista de Produtos

### Reprodução
1. Admin cadastra um novo produto via formulário
2. `POST /api/v1/admin/produtos` retorna 201 OK
3. Lista de produtos no admin (`GET /api/v1/admin/produtos`) **não inclui** o produto recém-criado
4. Refresh da página → agora aparece

### Endpoints afetados
- `GET /api/v1/admin/produtos`
- `GET /api/v1/lojas/{slug}/produtos`

---

## Caso 3: Categorias

### Reprodução
1. Admin cria/edita uma categoria
2. Endpoint de escrita retorna sucesso
3. Lista de categorias no admin ou catálogo público não reflete a alteração
4. Apenas após refresh(s) os dados atualizam

### Endpoints afetados
- `GET /api/v1/admin/categorias`
- `GET /api/v1/lojas/{slug}/categorias`

---

## Causa provável

Cache server-side nos endpoints GET. Possíveis fontes:

1. **`@Cacheable` sem `@CacheEvict`** — Endpoints GET usando Spring Cache mas os endpoints de escrita (POST/PUT/DELETE) não invalidam esse cache
2. **Cache HTTP** — Endpoints retornando headers `Cache-Control: max-age=...` que fazem o browser/proxy cachear a resposta
3. **Read replica com lag** — Se o GET lê de uma réplica e o PUT/POST escreve no primário

---

## Correção esperada

### Opção 1: `@CacheEvict` nos endpoints de escrita
```java
// Configurações
@CacheEvict(value = {"publicHomeConfig", "publicStore"}, allEntries = true)
@PutMapping("/admin/configuracoes/home")
public ResponseEntity<?> salvarConfiguracaoHome(...) { ... }

@CacheEvict(value = {"publicHomeConfig", "publicStore"}, allEntries = true)
@PutMapping("/admin/configuracoes/loja")
public ResponseEntity<?> salvarConfiguracaoLoja(...) { ... }

// Produtos
@CacheEvict(value = {"products", "publicProducts"}, allEntries = true)
@PostMapping("/admin/produtos")
public ResponseEntity<?> cadastrarProduto(...) { ... }

@CacheEvict(value = {"products", "publicProducts"}, allEntries = true)
@PutMapping("/admin/produtos/{id}")
public ResponseEntity<?> atualizarProduto(...) { ... }

// Categorias
@CacheEvict(value = {"categories", "publicCategories"}, allEntries = true)
@PostMapping("/admin/categorias")
public ResponseEntity<?> cadastrarCategoria(...) { ... }

@CacheEvict(value = {"categories", "publicCategories"}, allEntries = true)
@PutMapping("/admin/categorias/{id}")
public ResponseEntity<?> atualizarCategoria(...) { ... }
```

### Opção 2: Remover cache desses endpoints
Configurações e listas de produtos são leves — não precisam de cache agressivo.

### Opção 3: Headers HTTP `Cache-Control: no-cache`
```java
return ResponseEntity.ok()
    .cacheControl(CacheControl.noCache())
    .body(data);
```

---

## Estado do frontend

O frontend já faz tudo corretamente:
- `invalidateQueries` + `refetchQueries` após cada mutação
- `staleTime: 0` e `refetchOnMount: 'always'` nas queries críticas
- `setQueryData` com resposta do servidor para atualização imediata do cache local

**O único bloqueio é o servidor retornando dados antigos nos GETs após operações de escrita.**
