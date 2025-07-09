import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, onEditProfileSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setName(currentUser.currentUser?.name || "");
    setAvatarUrl(currentUser.currentUser?.avatar || "");
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar: avatarUrl });
  };

  return (
    <ModalWithForm
      title="Change profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="editname"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          required
        />
      </label>
      <label className="modal__label" htmlFor="editavatarUrl">
        Avatar{" "}
        <input
          type="text"
          className="modal__input"
          id="editavatarUrl"
          placeholder="Avatar URL"
          onChange={(e) => {
            setAvatarUrl(e.target.value);
          }}
          value={avatarUrl}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
