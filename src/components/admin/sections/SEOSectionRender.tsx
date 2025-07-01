import React from "react";
import { SEOSectionRenderProps } from "../admin.types";
import SEOAnalytics from "../../SEOAnalytics";

const SEOSectionRender: React.FC<SEOSectionRenderProps> = ({
    seoContent,
    updateSEOContent,
    updateSEOStructuredData,
    updateSEOAddress,
}) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
                SEO Einstellungen
            </h3>

            {/* SEO Analytics Dashboard */}
            <SEOAnalytics />

            {/* Basic SEO Settings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Grundlegende SEO Einstellungen
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Meta Titel
                            </label>
                            <input
                                type="text"
                                value={seoContent.title}
                                onChange={(e) =>
                                    updateSEOContent("title", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                maxLength={60}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {seoContent.title.length}/60 Zeichen
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Meta Beschreibung
                            </label>
                            <textarea
                                value={seoContent.description}
                                onChange={(e) =>
                                    updateSEOContent(
                                        "description",
                                        e.target.value
                                    )
                                }
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900 resize-none"
                                maxLength={160}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                {seoContent.description.length}/160 Zeichen
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Keywords
                            </label>
                            <input
                                type="text"
                                value={seoContent.keywords}
                                onChange={(e) =>
                                    updateSEOContent("keywords", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                placeholder="Keyword1, Keyword2, Keyword3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Canonical URL
                            </label>
                            <input
                                type="url"
                                value={seoContent.canonicalUrl}
                                onChange={(e) =>
                                    updateSEOContent(
                                        "canonicalUrl",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                OG Image URL
                            </label>
                            <input
                                type="text"
                                value={seoContent.ogImage}
                                onChange={(e) =>
                                    updateSEOContent("ogImage", e.target.value)
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            />
                        </div>
                    </div>

                    {/* Structured Data Settings */}
                    <div className="space-y-4">
                        <h5 className="text-lg font-semibold text-gray-900">
                            Strukturierte Daten (Schema.org)
                        </h5>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Firmenname
                            </label>
                            <input
                                type="text"
                                value={seoContent.structuredData.businessName}
                                onChange={(e) =>
                                    updateSEOStructuredData(
                                        "businessName",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Geschäftstyp
                            </label>
                            <select
                                value={seoContent.structuredData.businessType}
                                onChange={(e) =>
                                    updateSEOStructuredData(
                                        "businessType",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            >
                                <option value="LocalBusiness">
                                    Lokales Unternehmen
                                </option>
                                <option value="Organization">
                                    Organisation
                                </option>
                                <option value="Corporation">Unternehmen</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                value={seoContent.structuredData.telephone}
                                onChange={(e) =>
                                    updateSEOStructuredData(
                                        "telephone",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                E-Mail
                            </label>
                            <input
                                type="email"
                                value={seoContent.structuredData.email}
                                onChange={(e) =>
                                    updateSEOStructuredData(
                                        "email",
                                        e.target.value
                                    )
                                }
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Adresse
                            </label>
                            <input
                                type="text"
                                value={seoContent.structuredData.address.street}
                                onChange={(e) =>
                                    updateSEOAddress("street", e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                placeholder="Straße und Hausnummer"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    value={
                                        seoContent.structuredData.address
                                            .postalCode
                                    }
                                    onChange={(e) =>
                                        updateSEOAddress(
                                            "postalCode",
                                            e.target.value
                                        )
                                    }
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                    placeholder="PLZ"
                                />
                                <input
                                    type="text"
                                    value={
                                        seoContent.structuredData.address.city
                                    }
                                    onChange={(e) =>
                                        updateSEOAddress("city", e.target.value)
                                    }
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                    placeholder="Stadt"
                                />
                            </div>
                            <input
                                type="text"
                                value={
                                    seoContent.structuredData.address.country
                                }
                                onChange={(e) =>
                                    updateSEOAddress("country", e.target.value)
                                }
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                placeholder="Land (z.B. DE)"
                            />
                        </div>

                        {/* Opening Hours */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Öffnungszeiten
                            </label>
                            {seoContent.structuredData.openingHours.map(
                                (hours, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        value={hours}
                                        onChange={(e) => {
                                            const newHours = [
                                                ...seoContent.structuredData
                                                    .openingHours,
                                            ];
                                            newHours[index] = e.target.value;
                                            updateSEOStructuredData(
                                                "openingHours",
                                                newHours
                                            );
                                        }}
                                        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-900"
                                        placeholder="Mo-Fr 09:00-18:00"
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SEOSectionRender;
