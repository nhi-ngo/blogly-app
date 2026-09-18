import React, { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';
import { Category } from '../types/Category';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
} from '@nextui-org/react';
import { Edit2, Plus, Trash2 } from 'lucide-react';

interface CategoriesPageProps {
  isAuthenticated: boolean;
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({ isAuthenticated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categories = await categoryService.getCategories();
      setCategories(categories);
      setError(null);
    } catch (error) {
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEdit = async () => {
    if (!newCategoryName.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, newCategoryName.trim());
      } else {
        await categoryService.createCategory(newCategoryName.trim());
      }
      await fetchCategories();
      handleModalClose();
    } catch (error) {
      setError(`Failed to ${editingCategory ? 'update' : 'create'} category. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await categoryService.deleteCategory(category.id);
      await fetchCategories();
    } catch (err) {
      setError('Failed to delete category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setEditingCategory(null);
    setNewCategoryName('');
    onClose();
  };

  const openAddModal = (category: Category) => {
    setEditingCategory(null);
    setNewCategoryName('');
    onOpen();
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    onOpen();
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Categories</h1>
          {isAuthenticated && (
            <Button color="primary" startContent={<Plus size={16} />} onClick={openAddModal}>
              Add Category
            </Button>
          )}
        </CardHeader>

        <CardBody>
          {error && <div className="mb-4 p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>}

          <Table
            aria-label="Categories table"
            isHeaderSticky
            classNames={{
              wrapper: 'max-h-[600px]',
            }}
          >
            <TableHeader>
              <TableColumn>NAME</TableColumn>
              <TableColumn>POST COUNT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>

            <TableBody isLoading={loading} loadingContent={<div>Loading categories...</div>}>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.postCount || 0}</TableCell>
                  <TableCell>
                    {isAuthenticated ? (
                      <div className="flex gap-2">
                        <Button isIconOnly variant="flat" size="sm" onClick={() => openEditModal(category)}>
                          <Edit2 size={16} />
                        </Button>
                        <Tooltip
                          content={
                            category.postCount ? 'Cannot delete category with existing posts' : 'Delete category'
                          }
                        >
                          <Button
                            isIconOnly
                            variant="flat"
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(category)}
                            isDisabled={category?.postCount ? category.postCount > 0 : false}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </Tooltip>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={handleModalClose}>
        <ModalContent>
          <ModalHeader>{editingCategory ? 'Edit Category' : 'Add Category'}</ModalHeader>
          <ModalBody>
            <Input
              label="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              isRequired
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleAddEdit} isLoading={isSubmitting}>
              {editingCategory ? 'Update' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoriesPage;
