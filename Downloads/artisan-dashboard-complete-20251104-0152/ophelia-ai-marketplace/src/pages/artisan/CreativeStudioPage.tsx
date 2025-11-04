import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import Navigation from '@/components/shared/Navigation';
import { Video, Image, Sparkles, Download, Wand2 } from 'lucide-react';

export default function CreativeStudioPage() {
  const [activeTab, setActiveTab] = useState<'veo' | 'imagen'>('veo');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { user } = useAuth();

  const [veoForm, setVeoForm] = useState({
    prompt: '',
    videoType: 'product_reel',
    productName: ''
  });

  const [imagenForm, setImagenForm] = useState({
    prompt: '',
    imageType: 'product_poster',
    style: 'realistic'
  });

  async function generateVideo() {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('creative-studio-veo', {
        body: {
          prompt: veoForm.prompt,
          videoType: veoForm.videoType,
          productInfo: { name: veoForm.productName },
          artisanId: user?.id
        }
      });

      if (error) throw error;
      setResult(data.data);
    } catch (error: any) {
      console.error('Error:', error);
      alert('Generation failed: ' + error.message);
    } finally {
      setGenerating(false);
    }
  }

  async function generateImage() {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('creative-studio-imagen', {
        body: {
          prompt: imagenForm.prompt,
          imageType: imagenForm.imageType,
          style: imagenForm.style,
          productInfo: { name: veoForm.productName },
          artisanId: user?.id
        }
      });

      if (error) throw error;
      setResult(data.data);
    } catch (error: any) {
      console.error('Error:', error);
      alert('Generation failed: ' + error.message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Creative Studio</h1>
          <p className="text-lg text-gray-600">AI-powered content creation with VEO and Imagen 2</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('veo')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'veo'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Video className="w-5 h-5 inline mr-2" />
                VEO Video Generation
              </button>
              <button
                onClick={() => setActiveTab('imagen')}
                className={`flex-1 px-6 py-4 text-center font-semibold transition ${
                  activeTab === 'imagen'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Image className="w-5 h-5 inline mr-2" />
                Imagen 2 Image Generation
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'veo' ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Type
                  </label>
                  <select
                    value={veoForm.videoType}
                    onChange={(e) => setVeoForm({ ...veoForm, videoType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="product_reel">Product Reel (15s)</option>
                    <option value="process_video">Process Video (30s)</option>
                    <option value="story_video">Story Video (60s)</option>
                    <option value="social_reel">Social Reel (15s)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={veoForm.productName}
                    onChange={(e) => setVeoForm({ ...veoForm, productName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                    placeholder="e.g., Handwoven Silk Scarf"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Prompt
                  </label>
                  <textarea
                    value={veoForm.prompt}
                    onChange={(e) => setVeoForm({ ...veoForm, prompt: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                    placeholder="Describe the video you want to create..."
                  />
                </div>

                <button
                  onClick={generateVideo}
                  disabled={generating}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{generating ? 'Generating Video...' : 'Generate Video with VEO'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Type
                  </label>
                  <select
                    value={imagenForm.imageType}
                    onChange={(e) => setImagenForm({ ...imagenForm, imageType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="product_poster">Product Poster</option>
                    <option value="social_ad">Social Media Ad</option>
                    <option value="hero_banner">Hero Banner</option>
                    <option value="lifestyle_shot">Lifestyle Shot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Style
                  </label>
                  <select
                    value={imagenForm.style}
                    onChange={(e) => setImagenForm({ ...imagenForm, style: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  >
                    <option value="realistic">Realistic</option>
                    <option value="artistic">Artistic</option>
                    <option value="minimalist">Minimalist</option>
                    <option value="vintage">Vintage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Prompt
                  </label>
                  <textarea
                    value={imagenForm.prompt}
                    onChange={(e) => setImagenForm({ ...imagenForm, prompt: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                    placeholder="Describe the image you want to create..."
                  />
                </div>

                <button
                  onClick={generateImage}
                  disabled={generating}
                  className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>{generating ? 'Generating Image...' : 'Generate Image with Imagen 2'}</span>
                </button>
              </div>
            )}

            {result && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Generated Content</h3>
                
                {activeTab === 'veo' ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                      <Video className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Duration:</span> {result.video?.duration}s
                      </div>
                      <div>
                        <span className="font-semibold">Resolution:</span> {result.video?.resolution}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold">Format:</span> {result.video?.format}
                      </div>
                    </div>
                    
                    {result.socialOptimization && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Social Media Caption (Instagram):</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">
                          {result.socialOptimization.instagram.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <Image className="w-16 h-16 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold">Width:</span> {result.image?.dimensions.width}px
                      </div>
                      <div>
                        <span className="font-semibold">Height:</span> {result.image?.dimensions.height}px
                      </div>
                    </div>
                    
                    {result.editingSuggestions && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Editing Suggestions:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {result.editingSuggestions.map((suggestion: string, i: number) => (
                            <li key={i}>{suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <button className="mt-4 flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                  <Download className="w-5 h-5" />
                  <span>Download Content</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
