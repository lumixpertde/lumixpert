import AnalyticsDashboard from "../AnalyticsDashboard";
import MetaPixelDashboard from "../MetaPixelDashboard";
import PerformanceDashboard from "../PerformanceDashboard";
import SitemapManager from "../SitemapManager";
import { RenderContentProps } from "./admin.types";
import AboutSectionRender from "./sections/AboutSectionRender";
import ContactSectionRender from "./sections/ContactSectionRender";
import SEOSectionRender from "./sections/SEOSectionRender";
import GallerySectionRender from "./sections/GallerySectionRender";

const renderContent = ({
    activeSection,
    aboutContent,
    updateAboutContent,
    updateAboutFeature,
    contactContent,
    updateContactContent,
    seoContent,
    updateSEOContent,
    updateSEOStructuredData,
    updateSEOAddress,
    handleAddNew,
    galleryItems,
    isAddingNew,
    editingItem,
    formData,
    handleInputChange,
    handleImageUpload,
    handleSave,
    handleCancel,
    isAddingNewProduct,
    editingProduct,
    selectedMaterial,
    productFormData,
    handleProductInputChange,
    handleProductImageUpload,
    handleSaveProduct,
    handleCancelProduct,
    handleAddNewProduct,
    handleDelete,
    handleEdit,
    handleEditProduct,
    handleDeleteProduct,
}: RenderContentProps) => {
    switch (activeSection) {
        case "about":
            return (
                <AboutSectionRender
                    aboutContent={aboutContent}
                    updateAboutContent={updateAboutContent}
                    updateAboutFeature={updateAboutFeature}
                />
            );

        case "contact":
            return (
                <ContactSectionRender
                    contactContent={contactContent}
                    updateContactContent={updateContactContent}
                />
            );

        case "seo":
            return (
                <SEOSectionRender
                    seoContent={seoContent}
                    updateSEOAddress={updateSEOAddress}
                    updateSEOContent={updateSEOContent}
                    updateSEOStructuredData={updateSEOStructuredData}
                />
            );

        case "sitemap":
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        Sitemap Verwaltung
                    </h3>
                    <SitemapManager galleryItems={galleryItems} />
                </div>
            );

        case "analytics":
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        Google Analytics Dashboard
                    </h3>
                    <AnalyticsDashboard />
                </div>
            );

        case "metapixel":
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        Meta (Facebook) Pixel Dashboard
                    </h3>
                    <MetaPixelDashboard />
                </div>
            );

        case "performance":
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">
                        Performance Dashboard
                    </h3>
                    <PerformanceDashboard />
                </div>
            );

        case "gallery":
        default:
            return (
                <GallerySectionRender
                    handleAddNew={handleAddNew}
                    galleryItems={galleryItems}
                    isAddingNew={isAddingNew}
                    editingItem={editingItem}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleImageUpload={handleImageUpload}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    isAddingNewProduct={isAddingNewProduct}
                    editingProduct={editingProduct}
                    selectedMaterial={selectedMaterial}
                    productFormData={productFormData}
                    handleProductInputChange={handleProductInputChange}
                    handleProductImageUpload={handleProductImageUpload}
                    handleSaveProduct={handleSaveProduct}
                    handleCancelProduct={handleCancelProduct}
                    handleAddNewProduct={handleAddNewProduct}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleEditProduct={handleEditProduct}
                    handleDeleteProduct={handleDeleteProduct}
                />
            );
    }
};
export default renderContent;
