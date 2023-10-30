import React from "react";

export const DeleteModalComponent = (props) => {
    return (
        <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close text-white"
                onClick={() => props.onCloseHandler(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p className="text-lg">Are you sure you want to delete?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => props.onCloseHandler(true)}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => props.onCloseHandler(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

    )
}