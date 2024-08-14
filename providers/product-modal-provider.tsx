'use client'

import preventHydration from "@/components/hydration-prevention"
import PreviewModal from "@/components/preview-modal";

const ProductModalProvider = () => {
    preventHydration();
  return (
    <PreviewModal/>
  )
}

export default ProductModalProvider
