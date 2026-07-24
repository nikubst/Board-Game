import { useState, useEffect } from 'react';
import { Project, ProjectFormData, ProjectStatus } from '@/types';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectCount,
  getProjectsByStatus,
} from '@/services/projectService';
import { useAuth } from './useAuth';

export const useProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects(user.id);
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCount = async () => {
    if (!user) return 0;
    try {
      return await getProjectCount(user.id);
    } catch (err) {
      console.error('Error getting project count:', err);
      return 0;
    }
  };

  const getByStatus = async (status: ProjectStatus) => {
    if (!user) return [];
    try {
      return await getProjectsByStatus(user.id, status);
    } catch (err) {
      console.error('Error getting projects by status:', err);
      return [];
    }
  };

  const getById = async (id: string) => {
    try {
      return await getProjectById(id);
    } catch (err) {
      console.error('Error getting project by id:', err);
      throw err;
    }
  };

  const create = async (formData: ProjectFormData) => {
    if (!user) throw new Error('User not authenticated');
    try {
      const newProject = await createProject(formData, user.id);
      setProjects([newProject, ...projects]);
      return newProject;
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
      throw err;
    }
  };

  const update = async (id: string, formData: ProjectFormData) => {
    try {
      const updatedProject = await updateProject(id, formData);
      setProjects(
        projects.map((p) => (p.id === id ? updatedProject : p))
      );
      return updatedProject;
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete project');
      throw err;
    }
  };

  const refresh = () => {
    if (user) {
      fetchProjects();
    }
  };

  return {
    projects,
    loading,
    error,
    getCount,
    getByStatus,
    getById,
    create,
    update,
    remove,
    refresh,
  };
};