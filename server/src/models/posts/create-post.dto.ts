import { PostType } from '../post-type.enum';

export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly postType: PostType;
    readonly link?: string;
}