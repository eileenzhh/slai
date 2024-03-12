import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.window = UIWindow(frame: UIScreen.main.bounds)

        // Create and set the Launch Screen view controller
        let launchScreenViewController = UIStoryboard(name: "LaunchScreen", bundle: nil).instantiateInitialViewController()
        self.window?.rootViewController = launchScreenViewController
        self.window?.makeKeyAndVisible()

        // Simulate some loading time (replace this with your actual loading code)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            // Load CameraViewController from the Main storyboard
            let storyboard = UIStoryboard(name: "Main", bundle: nil)
            if let cameraViewController = storyboard.instantiateViewController(withIdentifier: "CameraViewController") as? CameraViewController {
                // Once the loading is done, replace the Launch Screen with your CameraViewController
                self.window?.rootViewController = cameraViewController
            }
        }

        return true
    }
}
