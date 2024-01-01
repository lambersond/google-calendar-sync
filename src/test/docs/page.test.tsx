import { create } from 'react-test-renderer'
import Docs from '@/app/docs/page'

describe('app/layout', () => {
  it('should match layout snapshot', () => {
    const tree = create(<Docs />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
