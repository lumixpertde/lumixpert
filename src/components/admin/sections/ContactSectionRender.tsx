import React from "react";
import { ContactSectionRenderProps } from "../admin.types";

const ContactSectionRender: React.FC<ContactSectionRenderProps> = ({
    contactContent,
    updateContactContent,
}) => {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">
                Kontakt Bearbeiten
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Titel
                        </label>
                        <input
                            type="text"
                            value={contactContent.title}
                            onChange={(e) =>
                                updateContactContent("title", e.target.value)
                            }
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Beschreibung
                        </label>
                        <textarea
                            value={contactContent.description}
                            onChange={(e) =>
                                updateContactContent(
                                    "description",
                                    e.target.value
                                )
                            }
                            rows={3}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            E-Mail
                        </label>
                        <input
                            type="email"
                            value={contactContent.email}
                            onChange={(e) =>
                                updateContactContent("email", e.target.value)
                            }
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Telefon
                        </label>
                        <input
                            type="tel"
                            value={contactContent.phone}
                            onChange={(e) =>
                                updateContactContent("phone", e.target.value)
                            }
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Adresse
                        </label>
                        {contactContent.address.map((line, index) => (
                            <input
                                key={index}
                                type="text"
                                value={line}
                                onChange={(e) => {
                                    const newAddress = [
                                        ...contactContent.address,
                                    ];
                                    newAddress[index] = e.target.value;
                                    updateContactContent("address", newAddress);
                                }}
                                className="w-full p-3 mb-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white"
                                placeholder={`Adresszeile ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                        Öffnungszeiten
                    </label>
                    <div className="space-y-2">
                        {Object.entries(contactContent.openingHours).map(
                            ([day, hours]) => (
                                <div
                                    key={day}
                                    className="grid grid-cols-2 gap-2"
                                >
                                    <input
                                        type="text"
                                        value={day}
                                        onChange={(e) => {
                                            const newHours = {
                                                ...contactContent.openingHours,
                                            };
                                            delete newHours[day];
                                            newHours[e.target.value] = hours;
                                            updateContactContent(
                                                "openingHours",
                                                newHours
                                            );
                                        }}
                                        className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                                    />
                                    <input
                                        type="text"
                                        value={hours}
                                        onChange={(e) => {
                                            const newHours = {
                                                ...contactContent.openingHours,
                                            };
                                            newHours[day] = e.target.value;
                                            updateContactContent(
                                                "openingHours",
                                                newHours
                                            );
                                        }}
                                        className="p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white text-sm"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSectionRender;
