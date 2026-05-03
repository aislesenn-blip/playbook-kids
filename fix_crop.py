import re

with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "r") as f:
    content = f.read()

# 1. Add crop state variables
crop_state = """
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
"""
content = re.sub(r'const \[isAddingProduct, setIsAddingProduct\] = useState\(false\);', crop_state, content)

# 2. Add Crop UI to Add Product Modal
crop_ui = """
             {isCropping ? (
               <div className="space-y-4">
                 <h2 className="text-2xl font-black mb-2">Perfect Crop</h2>
                 <p className="text-sm text-gray-500 mb-4 font-medium">Pinch or drag to fit your product in the 1:1 square. This ensures your store looks clean and professional.</p>
                 <div className="relative w-full aspect-square bg-black rounded-xl overflow-hidden group cursor-move">
                    {/* Mock crop view */}
                    <Image src={tempImage || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"} alt="Crop" fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />

                    {/* Crop Grid Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-2 border-white/50">
                       <div className="w-full h-1/3 border-b border-white/30"></div>
                       <div className="w-full h-1/3 border-b border-white/30"></div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none flex">
                       <div className="h-full w-1/3 border-r border-white/30"></div>
                       <div className="h-full w-1/3 border-r border-white/30"></div>
                    </div>
                 </div>
                 <div className="flex gap-3 mt-6">
                   <button onClick={() => { setIsCropping(false); setTempImage(null); }} className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-bold transition-colors">Cancel</button>
                   <button onClick={() => { setCroppedImage(tempImage); setIsCropping(false); }} className="flex-1 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-colors">Done Cropping</button>
                 </div>
               </div>
             ) : (
               <>
                 <h2 className="text-2xl font-black mb-6">Add New Product</h2>
                 <form onSubmit={handleAddProduct} className="space-y-4">
                    {croppedImage ? (
                        <div className="w-full h-40 bg-gray-100 rounded-xl border border-border relative overflow-hidden group">
                           <Image src={croppedImage} alt="Preview" fill className="object-cover" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button type="button" onClick={() => setCroppedImage(null)} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Remove</button>
                           </div>
                        </div>
                    ) : (
                        <div onClick={() => { setTempImage("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"); setIsCropping(true); }} className="w-full h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                            <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />
                            <span className="text-sm font-bold text-gray-500">Click to upload and crop</span>
                            <span className="text-xs text-gray-400 mt-1">1:1 ratio recommended</span>
                        </div>
                    )}
                    <div>
"""

content = re.sub(
    r'<h2 className="text-2xl font-black mb-6">Add New Product</h2>\s*<form onSubmit={handleAddProduct} className="space-y-4">\s*<div className="w-full h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">\s*<ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary mb-2 transition-colors" />\s*<span className="text-sm font-bold text-gray-500">Click to upload and crop</span>\s*<span className="text-xs text-gray-400 mt-1">1:1 ratio recommended</span>\s*</div>\s*<div>',
    crop_ui,
    content
)

# Fix missing closing tags for the alternate view
content = re.sub(
    r'<button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>\s*</form>',
    '<button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 shadow-lg shadow-primary/20">Publish Product</button>\n                 </form>\n               </>',
    content
)

# Update handleAddProduct to clear croppedImage
clear_crop = """
    setIsAddingProduct(false);
    setNewProduct({ name: '', price: '', category: 'Fashion & Apparels' });
    setCroppedImage(null);
  };
"""
content = re.sub(
    r'setIsAddingProduct\(false\);\s*setNewProduct\(\{ name: \'\', price: \'\', category: \'Fashion & Apparels\' \}\);\s*\};',
    clear_crop,
    content
)


with open("unimonday-web/src/app/vendor/dashboard/page.tsx", "w") as f:
    f.write(content)

print("Done patching crop UI")
