import { defineField, defineType } from 'sanity'

export const memberType = defineType({
  name: 'member',           // The internal key used for querying (keep it singular)
  title: 'Team Members',     // The readable name displayed in your Studio sidebar
  type: 'document',          // Required! Tells Sanity this is a standalone content collection
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Squad Role',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend Engineer (Next.js/React)', value: 'frontend' },
          { title: 'Backend Engineer (NestJS/Fastify)', value: 'backend' },
          { title: 'Mobile Developer (Flutter)', value: 'mobile' },
          { title: 'UI/UX Designer (Figma)', value: 'designer' },
          { title: 'Full-Stack Developer', value: 'fullstack' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true, 
      },
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
    }),
  ],
})