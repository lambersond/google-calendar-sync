import { DocsLayout } from '@/components/layouts'
import { DocumentView } from '../components/document-view'
import { TERMS_OF_SERVICE } from './constants'

export default function PrivacyPolicy() {
  return (
    <DocsLayout>
      <DocumentView document={TERMS_OF_SERVICE} />
    </DocsLayout>
  )
}
