/*
See the LICENSE.txt file for this sample’s licensing information.

Abstract:
The app's photo capture delegate object.
*/

import AVFoundation
import Photos
import UIKit
import Foundation

class PhotoCaptureProcessor: NSObject {
    private(set) var requestedPhotoSettings: AVCapturePhotoSettings
    
    private let willCapturePhotoAnimation: () -> Void
    
    private let livePhotoCaptureHandler: (Bool) -> Void
    
    lazy var context = CIContext()
    
    private let completionHandler: (PhotoCaptureProcessor) -> Void
    
    private var photoData: Data?
    
    private var livePhotoCompanionMovieURL: URL?

    // Save the location of captured photos.
    var location: CLLocation?

    init(with requestedPhotoSettings: AVCapturePhotoSettings,
         willCapturePhotoAnimation: @escaping () -> Void,
         livePhotoCaptureHandler: @escaping (Bool) -> Void,
         completionHandler: @escaping (PhotoCaptureProcessor) -> Void) {
        self.requestedPhotoSettings = requestedPhotoSettings
        self.willCapturePhotoAnimation = willCapturePhotoAnimation
        self.livePhotoCaptureHandler = livePhotoCaptureHandler
        self.completionHandler = completionHandler
    }
    
    private func didFinish() {
        if let livePhotoCompanionMoviePath = livePhotoCompanionMovieURL?.path {
            if FileManager.default.fileExists(atPath: livePhotoCompanionMoviePath) {
                do {
                    try FileManager.default.removeItem(atPath: livePhotoCompanionMoviePath)
                } catch {
                    print("Could not remove file at url: \(livePhotoCompanionMoviePath)")
                }
            }
        }
        
        completionHandler(self)
    }
}

/// This extension adopts all of the AVCapturePhotoCaptureDelegate protocol
/// methods.
extension PhotoCaptureProcessor: AVCapturePhotoCaptureDelegate {
    
    /// - Tag: WillBeginCapture
    func photoOutput(_ output: AVCapturePhotoOutput, willBeginCaptureFor resolvedSettings: AVCaptureResolvedPhotoSettings) {
        if resolvedSettings.livePhotoMovieDimensions.width > 0 && resolvedSettings.livePhotoMovieDimensions.height > 0 {
            livePhotoCaptureHandler(true)
        }
    }
    
    /// - Tag: WillCapturePhoto
    func photoOutput(_ output: AVCapturePhotoOutput, willCapturePhotoFor resolvedSettings: AVCaptureResolvedPhotoSettings) {
        willCapturePhotoAnimation()
    }
    
    /// - Tag: DidFinishProcessingPhoto
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?) {

        if let error = error {
            print("Error capturing photo: \(error)")
            return
        }
        
        self.photoData = photo.fileDataRepresentation()
    }
    
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishCapturingDeferredPhotoProxy deferredPhotoProxy: AVCaptureDeferredPhotoProxy?, error: Error?) {
        if let error = error {
            print("Error capturing deferred photo: \(error)")
            return
        }
        
        self.photoData = deferredPhotoProxy?.fileDataRepresentation()
    }
    
    /// - Tag: DidFinishRecordingLive
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishRecordingLivePhotoMovieForEventualFileAt outputFileURL: URL, resolvedSettings: AVCaptureResolvedPhotoSettings) {
        livePhotoCaptureHandler(false)
    }
    
    /// - Tag: DidFinishProcessingLive
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishProcessingLivePhotoToMovieFileAt outputFileURL: URL, duration: CMTime, photoDisplayTime: CMTime, resolvedSettings: AVCaptureResolvedPhotoSettings, error: Error?) {
        if error != nil {
            print("Error processing Live Photo companion movie: \(String(describing: error))")
            return
        }
        livePhotoCompanionMovieURL = outputFileURL
    }
    
    /// - Tag: DidFinishCapture
    func photoOutput(_ output: AVCapturePhotoOutput, didFinishCaptureFor resolvedSettings: AVCaptureResolvedPhotoSettings, error: Error?) {
        if let error = error {
            print("Error capturing photo: \(error)")
            didFinish()
            return
        }

        guard photoData != nil else {
            print("No photo data resource")
            didFinish()
            return
        }

        let test_uiimage = UIImage(data: photoData!)
        let encodedPhotoData = test_uiimage?.jpegData(compressionQuality: 1.0)!.base64EncodedString()
        let json: [String: String?] = ["image": encodedPhotoData]
        let jsonData = try? JSONSerialization.data(withJSONObject: json)
        
        
        let url = URL(string: "http://172.20.10.2:5000/image")!
        var request = URLRequest(url: url)
        request.setValue("application/json; charset=utf-8", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        request.httpBody = jsonData

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            print("Error sending image")
            self.didFinish()
            return
        }

        task.resume()
        didFinish()
//
////         generate boundary string using a unique per-app string
//        let boundary = UUID().uuidString
//
//        let session = URLSession.shared
//
////         Set the URLRequest to POST and to the specified URL
//        var urlRequest = URLRequest(url: url)
//        urlRequest.httpMethod = "POST"
//
////         Set Content-Type Header to multipart/form-data, this is equivalent to submitting form data with file upload in a web browser
////         And the boundary is also set here
//        urlRequest.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
//
//        var data = Data()
//
////         Add the image data to the raw http request data
//        let paramName = "paramName"
//        let fileName = "fileName"
//        data.append("\r\n--\(boundary)\r\n".data(using: .utf8)!)
//        data.append("Content-Disposition: form-data; name=\"\(paramName)\"; filename=\"\(fileName)\"\r\n".data(using: .utf8)!)
//        data.append("Content-Type: \"content-type header\"\r\n\r\n".data(using: .utf8)!)
//        data.append(test_uiimage!.pngData()!)
//        
//        data.append("\r\n--\(boundary)--\r\n".data(using: .utf8)!)
//
////         Send a POST request to the URL, with the data we created earlier
//        session.uploadTask(with: urlRequest, from: data, completionHandler: { responseData, response, error in
//            if error == nil {
//                let jsonData = try? JSONSerialization.jsonObject(with: responseData!, options: .allowFragments)
//                if let json = jsonData as? [String: Any] {
//                    print(json)
//                }
//            }
//        }).resume()
        
//        let encodedPhotoData = photoData?.base64EncodedString()
//        print(encodedPhotoData ?? "failed to print image")

//        PHPhotoLibrary.requestAuthorization { status in
//            if status == .authorized {
//                PHPhotoLibrary.shared().performChanges({
//                    let options = PHAssetResourceCreationOptions()
//                    let creationRequest = PHAssetCreationRequest.forAsset()
//                    options.uniformTypeIdentifier = self.requestedPhotoSettings.processedFileType.map { $0.rawValue }
//                    
//                    var resourceType = PHAssetResourceType.photo
//                    if  ( resolvedSettings.deferredPhotoProxyDimensions.width > 0 ) && ( resolvedSettings.deferredPhotoProxyDimensions.height > 0 ) {
//                        resourceType = PHAssetResourceType.photoProxy
//                    }
//                    creationRequest.addResource(with: resourceType, data: self.photoData!, options: options)
//                    
//                    // Specify the location in which the photo was taken.
//                    creationRequest.location = self.location
//                    
//                    if let livePhotoCompanionMovieURL = self.livePhotoCompanionMovieURL {
//                        let livePhotoCompanionMovieFileOptions = PHAssetResourceCreationOptions()
//                        livePhotoCompanionMovieFileOptions.shouldMoveFile = true
//                        creationRequest.addResource(with: .pairedVideo,
//                                                    fileURL: livePhotoCompanionMovieURL,
//                                                    options: livePhotoCompanionMovieFileOptions)
//                    }
//                    
//                }, completionHandler: { _, error in
//                    if let error = error {
//                        print("Error occurred while saving photo to photo library: \(error)")
//                    }
//                    
//                    self.didFinish()
//                }
//                )
//            } else {
//                self.didFinish()
//            }
        }
    }

