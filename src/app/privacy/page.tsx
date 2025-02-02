export default function PrivacyPage() {
  return (
      <main className="mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg opacity-75">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Introduction</h2>
            <p className="text-base-content/90">
              ASTAWON (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, and safeguard your information when you use our digital platform 
              designed for managing information and delivering updates related to Rutan Wonosobo.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-3">Information Collection</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal identification data (name, email, contact details)</li>
                <li>Institutional information for verification purposes</li>
                <li>Usage data and interaction metrics</li>
              </ul>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-3">Data Usage</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate official communications</li>
                <li>Improve platform services</li>
                <li>Maintain security and prevent misuse</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Data Protection</h2>
            <p className="mb-4">
              We implement industry-standard security measures including encryption, access controls, 
              and regular security audits to protect your information.
            </p>
            <div className="alert alert-info">
              <span>For data access or deletion requests, contact our Data Protection Officer at dpo@astawoon.go.id</span>
            </div>
          </div>
        </div>
      </main>
  )
}