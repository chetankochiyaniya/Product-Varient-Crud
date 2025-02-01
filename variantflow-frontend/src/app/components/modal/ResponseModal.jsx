import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";

export default function ResponseModal(props) {
	const [showModal, setShowModal] = useState(true);
	function onBtnResponse() {
		props.setApiResponseModal({ show: false });
		setShowModal(false);
	}

	const { isDarkTheme } = useTheme()

	return (
		<Modal show={showModal} animation={true} size="md" className={` ${isDarkTheme && "dark-modal"} mt-5`}>
			<Modal.Header className="text-center py-2">
				<Modal.Title className="text-center">
					<h3 className="mb-0">Response</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="p-10 ">
				<div>
					{typeof props.msg === "string" || typeof props.msg === "number"
						? props.msg
						: ""}
				</div>
			</Modal.Body>
			<Modal.Footer className="py-1 d-flex justify-content-center">
				<div>
					<Button variant="outline-primary" onClick={() => onBtnResponse()}>
						OK
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
