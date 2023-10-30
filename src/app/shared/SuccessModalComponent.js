import React from "react"

export const SuccessModalComponent = ({ message, closeHandler }) => {
    return (
        <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close text-white"
                onClick={() => closeHandler(false)}
              ></button>
            </div>
            <div className="modal-body">
                        <p className="text-lg">{message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => closeHandler(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}