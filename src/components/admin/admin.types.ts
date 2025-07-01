export interface GalleryItem {
    id: number;
    name: string;
    image: string;
    description: string;
    products?: ProductImage[];
}

export interface ProductImage {
    id: number;
    title: string;
    image: string;
    description: string;
}

export interface AboutContent {
    title: string;
    description: string;
    features: {
        title: string;
        description: string;
    }[];
}

export interface ContactContent {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string[];
    openingHours: {
        [key: string]: string;
    };
}

export interface SEOContent {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
    canonicalUrl: string;
    structuredData: {
        businessName: string;
        businessType: string;
        telephone: string;
        email: string;
        address: {
            street: string;
            city: string;
            postalCode: string;
            country: string;
        };
        openingHours: string[];
    };
}

export interface AdminPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export type ContentSection =
    | "gallery"
    | "about"
    | "contact"
    | "seo"
    | "sitemap"
    | "analytics"
    | "metapixel"
    | "performance";

export interface RenderContentProps {
    activeSection: ContentSection;
    aboutContent: AboutContent;
    updateAboutContent: (field: keyof AboutContent, value: any) => void;
    updateAboutFeature: (
        index: number,
        field: "title" | "description",
        value: string
    ) => void;
    contactContent: ContactContent;
    updateContactContent: (field: keyof ContactContent, value: any) => void;
    seoContent: SEOContent;
    updateSEOContent: (field: keyof SEOContent, value: any) => void;
    updateSEOStructuredData: (field: string, value: any) => void;
    updateSEOAddress: (
        field: keyof SEOContent["structuredData"]["address"],
        value: string
    ) => void;
    handleAddNew: () => void;
    galleryItems: GalleryItem[];
    isAddingNew: boolean;
    editingItem: GalleryItem | null;
    formData: {
        name: string;
        image: string;
        description: string;
    };
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: (e?: React.FormEvent) => void;
    handleCancel: () => void;
    isAddingNewProduct: boolean;
    editingProduct: ProductImage | null;
    selectedMaterial: GalleryItem | null;
    productFormData: {
        title: string;
        image: string;
        description: string;
    };
    handleProductInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleProductImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveProduct: () => void;
    handleCancelProduct: () => void;
    handleAddNewProduct: (materialId: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (item: GalleryItem) => void;
    handleEditProduct: (product: ProductImage, materialId: number) => void;
    handleDeleteProduct: (productId: number, materialId: number) => void;
}
export interface ContentSectionProps {
    aboutContent: AboutContent;
    updateAboutContent: (field: keyof AboutContent, value: string) => void;
    updateAboutFeature: (
        index: number,
        field: "title" | "description",
        value: string
    ) => void;
}
export interface ContactSectionRenderProps {
    contactContent: ContactContent;
    updateContactContent: (field: keyof ContactContent, value: any) => void;
}
export interface SEOSectionRenderProps {
    seoContent: SEOContent;
    updateSEOContent: (field: keyof SEOContent, value: any) => void;
    updateSEOStructuredData: (field: string, value: any) => void;
    updateSEOAddress: (
        field: keyof SEOContent["structuredData"]["address"],
        value: string
    ) => void;
}
export interface GallerySectionRenderProps {
    handleAddNew: () => void;
    galleryItems: GalleryItem[];
    isAddingNew: boolean;
    editingItem: GalleryItem | null;
    formData: {
        name: string;
        image: string;
        description: string;
    };
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: (e?: React.FormEvent) => void;
    handleCancel: () => void;
    isAddingNewProduct: boolean;
    editingProduct: ProductImage | null;
    selectedMaterial: GalleryItem | null;
    productFormData: {
        title: string;
        image: string;
        description: string;
    };
    handleProductInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    handleProductImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveProduct: () => void;
    handleCancelProduct: () => void;
    handleAddNewProduct: (materialId: number) => void;
    handleDelete: (id: number) => void;
    handleEdit: (item: GalleryItem) => void;
    handleEditProduct: (product: ProductImage, materialId: number) => void;
    handleDeleteProduct: (productId: number, materialId: number) => void;
}