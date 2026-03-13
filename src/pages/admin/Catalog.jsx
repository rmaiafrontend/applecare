import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid3X3, Tags } from "lucide-react";
import CategoriesTab from "@/components/catalog/CategoriesTab";
import TagsTab from "@/components/catalog/TagsTab";

export default function Catalog() {
  const [tab, setTab] = useState("categories");

  return (
    <div className="space-y-5 max-w-[1400px] mx-auto">
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-full p-1 h-10">
          <TabsTrigger value="categories" className="rounded-full text-[13px] data-[state=active]:bg-white dark:data-[state=active]:bg-[#0a84ff] data-[state=active]:shadow-sm dark:data-[state=active]:text-white dark:text-[#98989d] px-4 gap-1.5">
            <Grid3X3 className="w-3.5 h-3.5" /> Categorias
          </TabsTrigger>
          <TabsTrigger value="tags" className="rounded-full text-[13px] data-[state=active]:bg-white dark:data-[state=active]:bg-[#0a84ff] data-[state=active]:shadow-sm dark:data-[state=active]:text-white dark:text-[#98989d] px-4 gap-1.5">
            <Tags className="w-3.5 h-3.5" /> Tags
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-5">
          <CategoriesTab />
        </TabsContent>
        <TabsContent value="tags" className="mt-5">
          <TagsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
