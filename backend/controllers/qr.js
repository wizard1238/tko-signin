const {
  QRCodeStyling,
} = require("qr-code-styling-node/lib/qr-code-styling.common.js");
const nodeCanvas = require("canvas");

let options = require("../scripts/options.json");

var fs = require("fs")

exports.createQR = function (req, res, next) {
  if (req.body.link == null) {
    res.status(404);
    return res.send("Not Found");
  }

  options["data"] = req.body.link;

  const qrcode = new QRCodeStyling({
    nodeCanvas,
    ...options,
  });

  qrcode.getRawData("png").then((buffer) => {
    res.send(buffer.toString('base64'))
  });
};
