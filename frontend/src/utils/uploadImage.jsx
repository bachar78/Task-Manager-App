const previewSourceSet = (file, fn) => {
    const reader = new FileReader()
    reader.readAsDataURL(file[0])
    reader.onloadend = () => {
      fn(reader.result)
    }
}
  