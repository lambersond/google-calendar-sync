import { DocsLayout } from '@/components/layouts'
import { DocumentView } from '../components/document-view'
import { PRIVACY_POLICY } from './constants'

export default function PrivacyPolicy() {
  return (
    <DocsLayout>
      <DocumentView document={PRIVACY_POLICY} />
    </DocsLayout>
  )
}
