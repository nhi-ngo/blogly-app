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

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleAddEdit = async () => {};

  const handleDelete = async () => {};

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Categories</h1>
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
            </TableHeader>

            <TableBody isLoading={loading} loadingContent={<div>Loading categories...</div>}>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.postCount || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default CategoriesPage;
