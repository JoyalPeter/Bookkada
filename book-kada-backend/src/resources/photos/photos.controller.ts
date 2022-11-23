import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { BooksService } from '../books/books.service';

@Controller('photos')
export class PhotosController {
  constructor(
    private readonly photosService: PhotosService,
    private readonly booksService: BooksService,
  ) {}

  @Post('addPhoto')
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    const book = await this.booksService.findOneById(createPhotoDto.bookId);
    return await this.photosService.create(createPhotoDto, book);
  }

  @Get('getAll')
  async findAll() {
    return await this.photosService.findAll();
  }

  @Get('getBookCover/:id')
  async findOne(@Param('bookId') bookId: string) {
    return await this.photosService.findOne(+bookId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return await this.photosService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.photosService.remove(+id);
  }
}
