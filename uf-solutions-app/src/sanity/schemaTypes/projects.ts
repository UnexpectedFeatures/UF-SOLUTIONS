import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'projectName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Website Design & Application', value: 'web-design-app' },
          { title: 'Website Brochure', value: 'web-brochure' },
          { title: 'Mobile Application', value: 'mobile-app' },
          { title: 'Graphics Design', value: 'graphics-design' },
          { title: 'Custom Software', value: 'custom-software' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectStatus',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Ongoing', value: 'ongoing' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'ongoing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyName',
      title: 'Client / Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Project Cover Image',
      type: 'image',
      description: 'Upload a direct high-fidelity screenshot or design mockup render of the workspace build.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Please provide a showcase cover image asset.'),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Optional path link to the production deployment or active app store build link.',
    }),
    defineField({
      name: 'caseStudyUrl', // 👈 Newly added optional field
      title: 'Case Study URL',
      type: 'url',
      description: 'Optional external URL linking to an in-depth writeup (e.g., Medium, Notion, or internal blog post route).',
    }),
    defineField({
      name: 'developmentTeam',
      title: 'Development Team',
      type: 'array',
      description: 'Assign the modular squad members who built or are currently engineering this software system.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'member' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1).error('Assign at least one member to the team.'),
    }),
    defineField({
      name: 'startDate',
      title: 'Project Kickoff Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Project Completion Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      description: 'Leave completely blank if the status selector above is marked as Ongoing.',
      validation: (Rule) =>
        Rule.custom((endDate, context) => {
          const document = context.document
          if (document?.projectStatus === 'completed' && !endDate) {
            return 'Completion date is mandatory for completed builds.'
          }
          if (endDate && document?.startDate && endDate < document.startDate) {
            return 'The project completion date cannot sit before its kickoff launch date.'
          }
          return true
        }),
    }),
  ],
})