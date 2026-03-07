import React from 'react';
import { Button } from '@/components/ui/button';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-4">
          <Icon className="h-8 w-8 text-white/20" />
        </div>
      )}
      <h3 className="text-base font-semibold text-white/70 mb-1">{title}</h3>
      {description && <p className="text-[13px] text-white/30 text-center max-w-sm mb-5">{description}</p>}
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          size="sm"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white border-0"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
