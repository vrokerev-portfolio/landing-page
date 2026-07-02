import { defineField, defineType } from 'sanity'

const iconOptions = [
  'award',
  'code',
  'download',
  'github',
  'graduation',
  'instagram',
  'linkedin',
  'lock',
  'mail',
  'shield',
  'shieldCheck',
  'sparkles',
  'user',
]

const colorField = (name = 'color') =>
  defineField({
    name,
    title: 'Color hex',
    type: 'string',
    initialValue: '#38BDF8',
    validation: rule => rule.regex(/^#([0-9A-Fa-f]{3}){1,2}$/, { name: 'hex color' }),
  })

const iconField = (name = 'icon') =>
  defineField({
    name,
    title: 'Icon',
    type: 'string',
    options: { list: iconOptions.map(icon => ({ title: icon, value: icon })) },
    initialValue: 'award',
  })

const stringArrayField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{ type: 'string' }],
  })

export const siteContent = defineType({
  name: 'siteContent',
  title: 'Site Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Portfolio content',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({ name: 'srTitle', title: 'SEO accessible title', type: 'string' }),
        defineField({ name: 'statusBadge', title: 'Status badge', type: 'string' }),
        defineField({ name: 'terminalTitle', title: 'Terminal title', type: 'string' }),
        defineField({
          name: 'terminalLines',
          title: 'Terminal lines',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'text', type: 'string' }),
              defineField({ name: 'type', type: 'string', options: { list: ['command', 'comment', 'output'] } }),
              defineField({ name: 'highlight', type: 'string' }),
            ],
          }],
        }),
        defineField({ name: 'primaryCta', title: 'Primary CTA text', type: 'string' }),
        defineField({ name: 'primaryTarget', title: 'Primary CTA target', type: 'string' }),
        defineField({ name: 'secondaryCta', title: 'Secondary CTA text', type: 'string' }),
        defineField({ name: 'secondaryTarget', title: 'Secondary CTA target', type: 'string' }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
      fields: [
        defineField({ name: 'fileLabel', type: 'string' }),
        defineField({ name: 'status', type: 'string' }),
        defineField({ name: 'pill', type: 'string' }),
        defineField({ name: 'name', type: 'string' }),
        defineField({ name: 'title', type: 'string' }),
        stringArrayField('paragraphs', 'Paragraphs'),
        defineField({ name: 'command', type: 'string' }),
        defineField({ name: 'imageAlt', type: 'string' }),
        defineField({
          name: 'profileImages',
          title: 'Profile images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
          name: 'notes',
          title: 'Floating notes',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', type: 'string' }),
              defineField({ name: 'value', type: 'string' }),
              iconField(),
            ],
          }],
        }),
        defineField({
          name: 'stats',
          title: 'Bottom cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', type: 'string' }),
              defineField({ name: 'value', type: 'string' }),
              defineField({ name: 'sub', type: 'string' }),
              colorField(),
              iconField(),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'experience',
      title: 'Professional Experience',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'number', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Experience cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', type: 'string' }),
              defineField({ name: 'title', type: 'string' }),
              defineField({ name: 'period', type: 'string' }),
              defineField({ name: 'description', type: 'text' }),
              stringArrayField('stack', 'Stack chips'),
              colorField(),
              defineField({ name: 'metric', type: 'string' }),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'number', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Projects',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'id', type: 'slug', options: { source: 'title' } }),
              defineField({ name: 'title', type: 'string' }),
              defineField({ name: 'description', type: 'text' }),
              stringArrayField('stack', 'Stack chips'),
              colorField(),
              defineField({ name: 'image', title: 'Main image', type: 'image', options: { hotspot: true } }),
              defineField({ name: 'imageUrl', title: 'Fallback external image URL', type: 'url' }),
              defineField({ name: 'images', title: 'Gallery images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
              defineField({ name: 'previewOrientation', type: 'string', options: { list: ['landscape', 'portrait'] } }),
              defineField({ name: 'status', type: 'string' }),
              defineField({ name: 'gallery', title: 'Gallery color label', type: 'string' }),
              defineField({ name: 'link', title: 'Project link', type: 'url' }),
              defineField({ name: 'linkLabel', title: 'Project link label', type: 'string' }),
              stringArrayField('terminal', 'Console lines'),
            ],
            preview: {
              select: { title: 'title', media: 'image' },
            },
          }],
        }),
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Technical Skills',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'number', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({
          name: 'clusters',
          title: 'Skill categories',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'name', type: 'string' }),
              colorField(),
              defineField({
                name: 'center',
                title: 'Canvas position',
                type: 'object',
                fields: [
                  defineField({ name: 'x', type: 'number', validation: rule => rule.min(0).max(1) }),
                  defineField({ name: 'y', type: 'number', validation: rule => rule.min(0).max(1) }),
                ],
              }),
              defineField({
                name: 'skills',
                title: 'Skills',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    defineField({ name: 'name', type: 'string' }),
                    defineField({ name: 'proficiency', type: 'number', validation: rule => rule.min(1).max(3) }),
                  ],
                }],
              }),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'certificates',
      title: 'Certificates',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'number', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({
          name: 'items',
          title: 'Certificates',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'id', type: 'slug', options: { source: 'name' } }),
              iconField(),
              colorField(),
              defineField({ name: 'name', type: 'string' }),
              defineField({ name: 'issuer', type: 'string' }),
              defineField({ name: 'date', type: 'string' }),
              defineField({ name: 'credentialId', type: 'string' }),
              defineField({ name: 'skills', type: 'text' }),
              defineField({ name: 'badge', type: 'string' }),
              defineField({ name: 'link', type: 'url' }),
              defineField({ name: 'footer', type: 'string' }),
              defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
              defineField({ name: 'imageUrl', title: 'Fallback external image URL', type: 'url' }),
            ],
            preview: {
              select: { title: 'name', subtitle: 'issuer', media: 'image' },
            },
          }],
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string' }),
        defineField({ name: 'number', type: 'string' }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'terminalTitle', type: 'string' }),
        stringArrayField('terminalLines', 'Terminal lines'),
        stringArrayField('channelNames', 'Channel names to highlight'),
        defineField({ name: 'statusBadge', type: 'string' }),
        defineField({ name: 'responseText', type: 'string' }),
        defineField({
          name: 'links',
          title: 'Contact cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', type: 'string' }),
              defineField({ name: 'value', type: 'string' }),
              iconField(),
              defineField({ name: 'href', type: 'string' }),
              colorField(),
            ],
          }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
