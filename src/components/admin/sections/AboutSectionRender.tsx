import { ContentSectionProps } from "../admin.types";

const AboutSectionRender: React.FC<ContentSectionProps> = ({
    aboutContent,
    updateAboutContent,
    updateAboutFeature,
}) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
                Über Uns Bearbeiten
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        Titel
                    </label>
                    <input
                        type="text"
                        value={aboutContent.title}
                        onChange={(e) =>
                            updateAboutContent("title", e.target.value)
                        }
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        Beschreibung
                    </label>
                    <textarea
                        value={aboutContent.description}
                        onChange={(e) =>
                            updateAboutContent("description", e.target.value)
                        }
                        rows={4}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-4 text-gray-300">
                        Features
                    </label>
                    {aboutContent.features.map((feature, index) => (
                        <div
                            key={index}
                            className="mb-4 p-4 bg-gray-800 rounded-lg border border-gray-700"
                        >
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-gray-400">
                                        Feature Titel
                                    </label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) =>
                                            updateAboutFeature(
                                                index,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-gray-400">
                                        Feature Beschreibung
                                    </label>
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) =>
                                            updateAboutFeature(
                                                index,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        rows={2}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutSectionRender;
