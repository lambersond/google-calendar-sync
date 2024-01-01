import { create } from 'react-test-renderer'
import PrivacyPolicy from '@/app/docs/privacy-policy/page'

describe('app/layout', () => {
  it('should match layout snapshot', () => {
    const tree = create(<PrivacyPolicy />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
