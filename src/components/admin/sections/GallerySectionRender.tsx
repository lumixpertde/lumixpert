import { GallerySectionRenderProps } from "../admin.types";
import { motion, AnimatePresence } from "framer-motion";
import { EditIcon, EyeIcon, ImageIcon, PlusIcon, SaveIcon, TrashIcon, XIcon } from "lucide-react";

const GallerySectionRender = ({
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
}: GallerySectionRenderProps) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
                Galerie Verwalten
            </h3>

            {/* Add New Material Button */}
            <div className="mb-6">
                <motion.button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <PlusIcon className="w-5 h-5" />
                    Neues Material hinzufügen
                </motion.button>
            </div>

            {/* Form for Adding/Editing Materials */}
            <AnimatePresence>
                {(isAddingNew || editingItem) && (
                    <motion.div
                        className="mb-6 p-6 bg-gray-800 rounded-lg border border-gray-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">
                            {isAddingNew
                                ? "Neues Material hinzufügen"
                                : "Material bearbeiten"}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Material Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                                        placeholder="z.B. Metall, Holz, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Material Bild URL oder Upload
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                                            placeholder="/pfad/zum/bild.jpg oder https://..."
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                                id="imageUpload"
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                                Bild hochladen
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Beschreibung
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                                        placeholder="Beschreibung des Materials und der Gravurmöglichkeiten..."
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Vorschau
                                </label>
                                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                    {formData.image && (
                                        <img
                                            src={formData.image}
                                            alt={`${
                                                formData.name || "Material"
                                            } Vorschau - Lasergravur Beispielbild`}
                                            className="w-full h-40 object-cover rounded-md mb-3"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBWMTUwSDEwMFYxMDBINTBMMTAwIDUwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K";
                                            }}
                                        />
                                    )}
                                    <h4 className="font-semibold text-white">
                                        {formData.name || "Material Name"}
                                    </h4>
                                    <p className="text-gray-300 text-sm mt-1">
                                        {formData.description ||
                                            "Beschreibung wird hier angezeigt..."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <motion.button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <SaveIcon className="w-4 h-4" />
                                Speichern
                            </motion.button>
                            <motion.button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <XIcon className="w-4 h-4" />
                                Abbrechen
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form for Adding/Editing Products */}
            <AnimatePresence>
                {(isAddingNewProduct || editingProduct) && selectedMaterial && (
                    <motion.div
                        className="mb-6 p-6 bg-blue-900/20 rounded-lg border border-blue-700"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-white">
                            {isAddingNewProduct
                                ? `Neues Produkt für ${selectedMaterial.name} hinzufügen`
                                : `Produkt für ${selectedMaterial.name} bearbeiten`}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Produkt Titel
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={productFormData.title}
                                        onChange={handleProductInputChange}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                                        placeholder="z.B. Graviertes Metallschild, Holzbox mit Logo, etc."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Produkt Bild URL oder Upload
                                    </label>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            name="image"
                                            value={productFormData.image}
                                            onChange={handleProductInputChange}
                                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
                                            placeholder="/pfad/zum/produkt-bild.jpg oder https://..."
                                        />
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={
                                                    handleProductImageUpload
                                                }
                                                className="hidden"
                                                id="productImageUpload"
                                            />
                                            <label
                                                htmlFor="productImageUpload"
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
                                            >
                                                <ImageIcon className="w-4 h-4" />
                                                Produkt Bild hochladen
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Produkt Beschreibung
                                    </label>
                                    <textarea
                                        name="description"
                                        value={productFormData.description}
                                        onChange={handleProductInputChange}
                                        rows={4}
                                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white resize-none"
                                        placeholder="Detaillierte Beschreibung des fertigen Produkts..."
                                    />
                                </div>
                            </div>

                            {/* Product Preview */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Produkt Vorschau
                                </label>
                                <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                                    {productFormData.image && (
                                        <img
                                            src={productFormData.image}
                                            alt={`${
                                                productFormData.title ||
                                                "Produkt"
                                            } Vorschau - Lasergravur Beispiel`}
                                            className="w-full h-40 object-cover rounded-md mb-3"
                                            onError={(e) => {
                                                e.currentTarget.src =
                                                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTUwIDEwMEgxMDBWMTUwSDEwMFYxMDBINTBMMTAwIDUwWiIgZmlsbD0iIzZCNzI4MCIvPgo8L3N2Zz4K";
                                            }}
                                        />
                                    )}
                                    <h4 className="font-semibold text-white">
                                        {productFormData.title ||
                                            "Produkt Titel"}
                                    </h4>
                                    <p className="text-gray-300 text-sm mt-1">
                                        {productFormData.description ||
                                            "Produkt Beschreibung wird hier angezeigt..."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <motion.button
                                onClick={handleSaveProduct}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <SaveIcon className="w-4 h-4" />
                                Produkt Speichern
                            </motion.button>
                            <motion.button
                                onClick={handleCancelProduct}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <XIcon className="w-4 h-4" />
                                Abbrechen
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Materials List with Products */}
            <div className="space-y-6">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {/* Material Header */}
                        <div className="p-6 border-b border-gray-700">
                            <div className="flex items-center justify-between flex-wrap">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={item.image}
                                        alt={`${item.name} Material - Lasergravur Übersichtsbild`}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {item.description}
                                        </p>
                                        <p className="text-gray-400 text-xs mt-1">
                                            {item.products?.length || 0}{" "}
                                            Produkte
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <motion.button
                                        onClick={() =>
                                            handleAddNewProduct(item.id)
                                        }
                                        className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Produkt hinzufügen
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleEdit(item)}
                                        className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <EditIcon className="w-4 h-4" />
                                        Material bearbeiten
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                        Material löschen
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="p-6">
                            {item.products && item.products.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {item.products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="bg-gray-700 rounded-lg overflow-hidden border border-gray-600 hover:border-gray-500 transition-colors"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={product.image}
                                                    alt={`${product.title} - ${item.name} Lasergravur Produktbild`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="font-medium text-white mb-2 text-sm">
                                                    {product.title}
                                                </h4>
                                                <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex gap-2">
                                                    <motion.button
                                                        onClick={() =>
                                                            handleEditProduct(
                                                                product,
                                                                item.id
                                                            )
                                                        }
                                                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                    >
                                                        <EditIcon className="w-3 h-3" />
                                                        Bearbeiten
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() =>
                                                            handleDeleteProduct(
                                                                product.id,
                                                                item.id
                                                            )
                                                        }
                                                        className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                    >
                                                        <TrashIcon className="w-3 h-3" />
                                                        Löschen
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                    <p className="text-gray-400">
                                        Keine Produkte für {item.name} vorhanden
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Klicken Sie auf "Produkt hinzufügen" um
                                        zu beginnen
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {galleryItems.length === 0 && (
                <div className="text-center py-12">
                    <EyeIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                        Keine Materialien vorhanden
                    </p>
                    <p className="text-gray-500">
                        Klicken Sie auf "Neues Material hinzufügen" um zu
                        beginnen
                    </p>
                </div>
            )}
        </div>
    );
}

export default GallerySectionRender;
