import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";


const UserCard = ({ user }) => {
    const getRoleLabel = () => {
        if (user?.roles.includes('ROLE_ADMIN')) {
            return 'Administrateur';
        } else {
            return 'Utilisateur';
        }
    };

    const { isDark } = useTheme();

    const cardBg = isDark ? "bg-slate-600" : "bg-white";
    const textColor = isDark ? "text-slate-200" : "text-black";
    const iconColor = isDark ? "text-gray-300" : "text-gray-500";

    return (
        <div className="flex flex-col items-center p-6" aria-label="Section du profil utilisateur">
            {user && (
                <div
                    className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col items-center ${cardBg}`}
                    aria-label="Fiche utilisateur"
                >
                    <div className="mb-4">
                        <FaUserCircle size={100} className={`${iconColor}`}  aria-hidden="true"  />
                    </div>
                    <h2
                        className={`text-xl font-bold mb-4 ${textColor}`} role="heading" aria-level="2">Informations utilisateur</h2>
                    <p className={`text-center ${textColor}`} aria-label={`Prénom: ${user.firstname}`}><strong>Prénom :</strong> {user.firstname}</p>
                    <p className={`text-center ${textColor}`} aria-label={`Nom: ${user.lastname}`}><strong>Nom :</strong> {user.lastname}</p>
                    <p className={`text-center ${textColor}`} aria-label={`Email: ${user.email}`}><strong>Email :</strong> {user.email}</p>
                    <p className={`text-center ${textColor}`} aria-label={`Rôle: ${getRoleLabel()}`}><strong>Rôle :</strong> {getRoleLabel()}</p>
                </div>
            )}
        </div>
    );
};

export default UserCard;