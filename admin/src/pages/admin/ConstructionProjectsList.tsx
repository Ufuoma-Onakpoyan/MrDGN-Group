import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { constructionProjectsAPI, type ConstructionProject } from '@/lib/blog-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, Search, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConstructionProjectsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: ['construction-projects'],
    queryFn: () => constructionProjectsAPI.getItems(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => constructionProjectsAPI.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['construction-projects'] });
      toast({ title: 'Success', description: 'Project deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' });
    },
  });

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6 text-center text-foreground bg-background">Loading projects...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center bg-background text-foreground">
        <p className="text-destructive font-medium">Failed to load projects</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        <p className="text-xs text-muted-foreground mt-4">Ensure the backend is running and VITE_API_URL is set.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Construction Projects</h1>
          <p className="text-muted-foreground">
            Featured projects shown on the Construction site (home & projects page)
          </p>
        </div>
        <Link to="/admin/construction-projects/new">
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="text-muted-foreground">No projects found</div>
              <p className="text-sm text-muted-foreground mt-2">Add projects to display on the Construction site</p>
              <Link to="/admin/construction-projects/new">
                <Button className="mt-4">Add Project</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item: ConstructionProject) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt=""
                          className="w-16 h-16 object-cover rounded border shrink-0"
                        />
                      )}
                      <div className="space-y-1 flex-1 min-w-0">
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">{item.category}</Badge>
                          {item.location && (
                            <Badge variant="outline">{item.location}</Badge>
                          )}
                          {item.value && (
                            <Badge variant="outline">{item.value}</Badge>
                          )}
                          <Badge variant={item.published ? 'default' : 'secondary'}>
                            {item.published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={`/admin/construction-projects/edit/${item.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    if (window.confirm('Delete this project?')) deleteMutation.mutate(item.id);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ConstructionProjectsList;
