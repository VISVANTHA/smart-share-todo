
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TaskFilter } from '@/types/task';
import { Search, Filter } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFilter;
  onFilterChange: (filters: TaskFilter) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
    overdue: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
  taskCounts
}) => {
  const statusFilters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'active', label: 'Active', count: taskCounts.active },
    { key: 'completed', label: 'Completed', count: taskCounts.completed },
    { key: 'overdue', label: 'Overdue', count: taskCounts.overdue },
  ];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10 glass-card border-border/50"
        />
      </div>

      {/* Status Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((status) => (
          <Button
            key={status.key}
            variant={filters.status === status.key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange({ ...filters, status: status.key as any })}
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            {status.label}
            <Badge variant="secondary" className="text-xs">
              {status.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Priority Filter */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Priority:</span>
        </div>
        <Select 
          value={filters.priority || 'all'} 
          onValueChange={(value) => onFilterChange({ ...filters, priority: value as any })}
        >
          <SelectTrigger className="w-32 glass-card border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
