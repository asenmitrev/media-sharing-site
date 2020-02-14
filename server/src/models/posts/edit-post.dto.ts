import { PostType } from '../post-type.enum';

export class EditPostDTO {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly postType: PostType;
    readonly link: string;
}