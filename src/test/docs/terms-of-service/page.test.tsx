import { create } from 'react-test-renderer'
import TermsOfService from '@/app/docs/terms-of-service/page'

describe('app/layout', () => {
  it('should match layout snapshot', () => {
    const tree = create(<TermsOfService />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
