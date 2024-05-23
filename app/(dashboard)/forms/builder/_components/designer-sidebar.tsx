import React from 'react'
import { FormElements } from './form-elements'
import SidebarBtnElement from './sidebar-btn-element'
import { useDesigner } from '../_hooks/use-designer'
import SidebarFormElement from './sidebar-form-element'
import FormPropertiesSidebar from './form-properties-sidebar'

type Props = {}

function DesignerSidebar({}: Props) {
  const {selectedElement} = useDesigner()
  return (
   <aside className='w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
    {!selectedElement && <SidebarFormElement />}
    {selectedElement && <FormPropertiesSidebar />}
   </aside>
  )
}

export default DesignerSidebar