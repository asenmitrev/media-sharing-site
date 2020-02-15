import { Controller, Get, Param, Body, Post, UseGuards, Request, Put, Req, Delete, Query, UseFilters } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from '@models/posts/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { EditPostDTO } from '@models/posts/edit-post.dto';
import { DeletePostDTO } from '@models/posts/delete-post.dto';
import { GenericQueryFailedExceptionFilter } from '@app/filters/generic-query-failed.filter';

@Controller('posts')
@UseFilters(GenericQueryFailedExceptionFilter)
export class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) {
        
    }

    @Get()
    getAll(@Query('skip') skip, @Query('take') take) {
        skip = skip ? skip : 0;
        take = take ? (take > 50 ? 50 : take) : 20;
        return this.postsService.getPostsWithLikes(skip, take);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(id);
    }

    @UseGuards(AuthGuard())
    @Post()
    create(@Body() dto: CreatePostDTO, @Request() req) {
        return this.postsService.create(dto, req.user);
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    edit(@Body() dto: EditPostDTO, @Request() req) {
        return this.postsService.edit(dto, req.user);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    remove(@Body() dto: DeletePostDTO, @Request() req) {
        return this.postsService.delete(dto, req.user);
    }

    @UseGuards(AuthGuard())
    @Post(':id/like')
    like(@Param('id') postId: string, @Request() req) {
        return this.postsService.like(postId, req.user);
    }
}
