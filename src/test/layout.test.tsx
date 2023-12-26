import { create } from 'react-test-renderer'
import RootLayout from '@/app/layout'

describe('app/layout', () => {
  it('should match layout snapshot', () => {
    const tree = create(<RootLayout>Testing</RootLayout>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
