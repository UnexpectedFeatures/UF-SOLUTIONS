import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the post used for blog list preview cards.',
      validation: (Rule) => Rule.max(200).warning('Keep snippets brief under 200 characters.'),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'member' }], // Links a blog post directly to your team members schema!
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Cover Image',
      type: 'image',
      options: {
        hotspot: true, // Allows cropping images straight from the browser UI
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Tech Stack Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'body',
      title: 'Content Body',
      type: 'array',
      of: [
        { type: 'block' }, // Standard headings, bullet points, bold/italic text
        { type: 'image' }, // Inline image blocks inside the article body
      ],
    }),
  ],
})