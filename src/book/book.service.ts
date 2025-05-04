import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>,
    ) {}

    async findAll(query: Query): Promise<Book[]> {
        // Pagination
        const resPerPage =  2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        // Search functionality
        const keyWord = query.keyword ? {
            title: {
                $regex: query.keyword,
                $options: 'i',
            }
        } : {};

        console.log(keyWord);
        

        const books  = await this.bookModel.find({...keyWord}).limit(resPerPage).skip(skip);
        return books;
    }

    async createBook(book: Book): Promise<Book> {
        const res = await this.bookModel.create(book);
        return res;
    }

    async findById(id: string): Promise<Book> {
        const isValidObjectId = mongoose.isValidObjectId(id);

        if (!isValidObjectId) {
            throw new BadRequestException('Please provide a valid ID');
        }
        const book = await this.bookModel.findById(id);
        if (!book) { 
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async updateBook(id: string, book: Book): Promise<Book> {
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, { new: true });
        if (!updatedBook) {
            throw new NotFoundException('Book not found');
        }
        return updatedBook;
    }

    async deleteBook(id: string): Promise<Book> {
        const deletedBook = await this.bookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new NotFoundException('Book not found');
        }
        return deletedBook;
    }
}
