import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll() {
        return 'This will return all movies';
    } 

    @Get("/:id")
    getOne(@Param("id") id: string) {
        return `This will return movie with id ${id}`;
    }

    @Post()
    create() {
        return 'This will create a movie';
    }

    @Delete("/:id")
    remove(@Param('id') id: string) {
        return `This will delete a movie ${id}`;
    }

    @Patch("/:id")
    path(@Param('id') id:string) {
        return `This will Patch a movie ${id}`;
    }
}
