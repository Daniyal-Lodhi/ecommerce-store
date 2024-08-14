import usePreviewModal from '@/hooks/use-preview-modal'
import Modal from './ui/modal';
import ProductGallery from './gallery/product-gallery';
import ProductInfo from './ui/product-info';


const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = previewModal?.data;

  if(!product){
    return null;
  }
  
  return (
    <Modal
    open={previewModal.isOpen}
    onClose={previewModal.onClose}
    >
      <div className='w-full grid gap-x-6 grid-col-1 items-start sm:grid-cols-12 lg:gap-x-6 ' >
        <div className='sm:col-span-4 lg:col-span-5 ' >
          <ProductGallery
          images={product?.images}
          key={product.id}
          />
            </div>
          <div className='sm:col-span-8 lg:col-span-7'>
            <ProductInfo 
            product={product}
            key={product.id}
            />
          

        </div>

      </div>

    </Modal>
  )
}

export default PreviewModal
