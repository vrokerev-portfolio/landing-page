import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'yourprojectid'
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'victor-meneses-portfolio',
  title: 'Victor Meneses Portfolio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Content')
              .id('siteContent')
              .child(
                S.document()
                  .schemaType('siteContent')
                  .documentId('siteContent')
                  .title('Site Content'),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
