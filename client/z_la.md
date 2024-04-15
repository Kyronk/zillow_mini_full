# Các thư viện
    npm i redux-persist react-redux redux: mấy cái này dùng cho redux (quá quen rồi)

    - thunk
    - axios
    - react-router-dom


# luu ý tailwind khi dùng với vite và npm app nó khác nhau

# tool html class to css in file style css


# lưu ý về các thuộc tính css

    thanh kéo thả ( ví dụ như giá cả trong khoảng, âm thanh, ....) là input
    muốn làm cái này thì google input range 2 value là được
    còn input range 1 value là input range

    input range được cấu tạo từ 2 thành phần : 1 slider thumb, 2 là slider track

    thuộc tính appearance-none : là mặc định tuỳ theo trình duyện

# Whitespace-nowrap: không phải lúc nào cũng có thể sử dụng dược white-space
 - nếu k dùng được thì cứ cắt string ra và lấy trong khoảng như bình thường


# Lưu hình ảnh
 - lưu trên cloud dynary
 - lưu trên database 
    + dung lượng rất lớn, tốc độ chậm
    + ban đầu hình ảnh từ phía client gửi lưu định dạng sang base64
    + rồi từ base 64 trả vể thì cần dùng thư viện buffer npm package
    + cái này khá nặng nên nếu lưu ít ít avatar đồ thì lưu được
    + ví dụ mà lưu nhiều ảnh (sản phẩm, ...) thì nên dùng cloud