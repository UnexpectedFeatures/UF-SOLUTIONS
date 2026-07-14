import { type SchemaTypeDefinition } from 'sanity'
import { memberType } from './members'
import { postType } from './blog-post'
import { projectType } from './projects'
import { testimonialType } from './testimonial-type'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [memberType, postType, projectType, testimonialType],
}
