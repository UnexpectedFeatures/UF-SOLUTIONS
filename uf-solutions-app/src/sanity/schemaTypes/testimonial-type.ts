import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Client Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'The full name of the person giving the testimonial.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Client Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('Please enter a valid email address.'),
    }),
    defineField({
      name: 'emailAvatar',
      title: 'Client Avatar / Portrait',
      type: 'image',
      description: 'Optional headshot of the client.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyImage',
      title: 'Company Logo',
      type: 'image',
      description: 'Optional logo asset for the client corporate brand.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      description: 'Name of the application or system built by UF-Solutions (e.g., OJT Portal, E-Commerce Platform).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageCover',
      title: 'Showcase Cover Image',
      type: 'image',
      description: 'A background or visual graphic cover image for this testimonial card layout.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Please provide a showcase cover image asset for the testimonial structure.'),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 - 5 Stars)',
      type: 'number',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ (5 Stars)', value: 5 },
          { title: '⭐⭐⭐⭐ (4 Stars)', value: 4 },
          { title: '⭐⭐⭐ (3 Stars)', value: 3 },
          { title: '⭐⭐ (2 Stars)', value: 2 },
          { title: '⭐ (1 Star)', value: 1 },
        ],
      },
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'shortFeedback',
      title: 'Short Feedback / Review',
      type: 'text',
      rows: 4,
      description: 'A punchy direct quote from the client describing their service experience.',
      validation: (Rule) => Rule.required().max(300).warning('Keep client feedback concise under 300 characters.'),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Project URL',
      type: 'url',
      description: 'The active web or application URL link where the finished product is live.',
      validation: (Rule) => Rule.required(),
    }),
  ],
})