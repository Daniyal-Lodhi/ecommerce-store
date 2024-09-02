'use client'

import PreventHydration from "@/components/hydration-prevention";
import PreviewModal from "@/components/preview-modal";

const ProductModalProvider = () => {
  return (
    <>
      <PreventHydration />

      <PreviewModal />
    </>
  )
}

export default ProductModalProvider
