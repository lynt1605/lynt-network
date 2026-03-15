
## Track B — Middle

## 1. Những rủi ro hoặc vấn đề có thể xảy ra với sản phẩm này

Một nền tảng SaaS giúp các cửa hàng online kết nối với các dịch vụ bên ngoài (như vận chuyển, thanh toán, notification…) sẽ phải đối mặt với nhiều rủi ro cả về kỹ thuật lẫn quá trình phát triển sản phẩm.

### 1.1 Phụ thuộc vào hệ thống bên thứ ba

Hệ thống phụ thuộc nhiều vào các dịch vụ bên ngoài như đơn vị vận chuyển hoặc cổng thanh toán.

Một số rủi ro có thể xảy ra:

- API phản hồi chậm hoặc không ổn định  
- downtime từ phía provider  
- thay đổi API hoặc version  
- dữ liệu trả về không nhất quán  

Những điều này có thể dẫn tới việc khó khăn trong qua trình phát triển và khả năng dữ liệu sẽ không đồng bộ so với các các bên.

Để giảm rủi ro, hệ thống nên có:

- thêm cơ chế retry( có thể làm tự động hoặc bằng tay) 
- có cơ chế xử lí timeout khi gọi API  
- xử lý bất đồng bộ (có thể thêm các cronjob để chủ động sync dữ liệu theo từng giờ)  
- thêm các cơ chế theo dõi tình trạng chạy của hệ thống


### 1.2 Độ phức tạp khi tích hợp nhiều dịch vụ

Mỗi dịch vụ bên ngoài có thể có các cơ chế giao tiếp khác nhau nên độ phức tạp của hệ thống bị tăng cao dẫn tới khó khăn trong thời gian đầu phát triển và bảo trì hệ thống. Một số trưởng hớp có thể xảy ra như là :

- cách authentication khác nhau  => khó khăn trong setting các thông số và cơ chế refresh token
- cấu trúc request/response khác nhau  => mapping dữ liệu với hệ thống 
- quy trình xử lý khác nhau => logic của mỗi dịch vụ sẽ khác biệt=> hệ thống phức tạph 


### 1.3 Đồng bộ trạng thái giữa nhiều hệ thống

Trong hệ thống này,  trạng thái của đơn hàng phục thuộc các bên cung cấp dịch vụ khác dẫn tới việc có thể xảy ra việc delay hoặc không đồng bộ trạng thái đơn hàng, trạng thại vận chuyển.

Một số vấn đề thường gặp:

- update từ shipping provider bị delay  
- event bị gửi nhiều lần  
- lỗi xảy ra ở giữa nhiều bước xử lý  


### 1.4 Rủi ro trong quá trình phát triển sản phẩm

Ngoài các vấn đề kỹ thuật, quá trình phát triển sản phẩm cũng có thể gặp một số rủi ro.

#### Kiến trúc không cố định

Khi mà hệ thống cần thêm hoặc bổ sung một dịch vụ bên ngoài khác có cấu trúc và logic khác biêt => phải phát triển thêm để đảm bảo hệ thống vận hành.

#### Tài liệu của các dịch vụ ngoài có thể không chính xác với thực tế

Một số dịch vụ ngoài có tài liệu bị cũ hoặc bị sai , không chính xác=> gặp khó khăn khi kiểm thử

#### Cơ chế Auth của bên ngoài

Một số dịch vụ có cơ chế auth cần auth code hoặc login trên ui hoặc thười gian token có hạn thấm=> cần điều chỉnh phù hợp cho từng hệ thống

---

## 2. Những ưu tiên cải thiện trong 2–3 tháng tới

Trong giai đoạn đầu của sản phẩm, em sẽ ưu tiên xây dựng **một nền tản ổn định với các tính năng cơ bản như tạo cửa hàng, tạo order , list order tích hợp dịch vụ vận chuyển và xử lý đơn hàng **.



### 2.1 Tăng độ ổn định khi giao tiếp bên ngoài

Muốn hệ thống hoạt động ổn đình thì cần phải đảm bảo việc giao tiếp với các dịch vụ bên ngoài ổn định, chính xác và nắm bắt các vấn đề sớm nhất có thể. Để tăng độ ổn định trong việc giao tiếp thì có thể triển khai các điều:

- sử dụng **job queue** cho các tác vụ gọi API bên ngoài  ( có thể dùng queue cho notify , update order)
- thêm cơ chế retry(phải cố định số lượng retry=> nếu quá nhiều thì có thể notify cho admin) 
- timeout khi gọi API  
- logging các lỗi integration  

Điều này giúp hệ thống hoạt động ổn định hoặc admin có thể năm bắt được tình trạng khi provider gặp lỗi tạm thời.


### 2.2 Xây dựng framework cho integrations

Khi số lượng integration tăng lên, việc có một cách tổ chức rõ ràng là rất quan trọng.

Ví dụ:

- định nghĩa interface chung cho provider  
- mỗi provider implement adapter riêng  
- tách logic provider khỏi business logic

Điều này giúp việc thêm provider mới dễ dàng hơn và giảm ảnh hưởng đến hệ thống hiện tại.

### 2.3 Cải thiện khả năng quan sát hệ thống (observability)

Khi hệ thống bắt đầu tích hợp nhiều dịch vụ thì việc theo dõi hệ thống nó là quan trọng. Em nghĩ mình có thể triển khai một số tính năng để tăng khả năng quan sát như là:

- structured logging  
- theo dõi latency của API  
- monitoring các background jobs
- notify qua các kênh khi các trường hợp bên cung cấp lỗi

=> giúp team phát hiện và xử lý sự cố nhanh hơn.

### 2.4 Tập trung vào workflow chính của merchant

Ở giai đoạn đầu, em sẽ ưu tiên đảm bảo các workflow chính hoạt động ổn định như là:

- merchant onboarding  
- tạo và quản lý đơn hàng  
- kết nối đơn vị vận chuyển  
- xử lý thanh toán  

Việc đảm bảo các tính năng cốt lõi hoạt động tốt sẽ là nên tảng để phát triển thêm các tính năng sau này.

---

## 3. Một quyết định em sẽ chủ động trì hoãn

Một quyết định em sẽ chưa tiến hành triển khai liền là **tối ưu hóa hệ thống cho quy mô rất lớn quá sớm**.

Ví dụ:

- thiết kế infrastructure cho hàng triệu request ngay từ đầu  
- xây dựng hệ thống phân tán quá phức tạp khi traffic còn thấp  

Ở giai đoạn đầu, mục tiêu quan trọng hơn là:

- đảm bảo hệ thống hoạt động ổn định  
- hỗ trợ tốt các workflow chính của merchant  
- giữ kiến trúc đủ đơn giản để dễ thay đổi

Khi hệ thống bắt đầu có nhiều người dùng hơn và có dữ liệu thực tế về traffic, team có thể đầu tư thêm vào:

- scaling services  
- caching  
- database optimization  

Cách tiếp cận này giúp việc đẩy nhanh tốc độ phát triển ban đầu và sau này phần đó có thể tiến hành cải tiến khi dự án nó đã vào vận hành và lưu lượng người dùng tăng lên.

---

## AI Usage & Critical Thinking

> “To build a scalable SaaS product, start with a strong architecture and add all necessary infrastructure early so you don’t need to rewrite later.”

Em **không hoàn toàn đồng ý** với lời khuyên này.

Việc nghĩ trước về khả năng mở rộng là quan trọng, nhưng xây dựng quá nhiều infrastructure ngay từ đầu có thể làm tăng độ phức tạp và làm chậm quá trình phát triển sản phẩm. Điều này dẫn đến việc tốn nhân sự cũng như thời gian vào cái chưa thực sự cần thiết vào thời điểm ban đầu của dự án.



### Lí do

Trong thực tế, yêu cầu sản phẩm thường thay đổi khi vào quá trình vận hành và triển khai thêm các dịch vụ bên ngoài.

Nếu đầu tư quá nhiều vào kiến trúc phức tạp ngay từ đầu, team có thể:

- xây dựng những thứ chưa thực sự cần thiết  
- mất nhiều thời gian vào infrastructure thay vì phát triển tính năng  
- phải thay đổi lại kiến trúc khi product direction thay đổi  

Một cách tiếp cận hợp lý hơn là **bắt đầu với kiến trúc đơn giản nhưng đáng tin cậy**, sau đó cải tiến dần khi hệ thống phát triển.

---

## Originality

Em có sử dụng tool AI (ChatGPT) như một công cụ hỗ trợ để sắp xếp lại các ý tưởng và giúp cách trình bày được rõ ràng, mạch lạc hơn. 
Các ý tưởng và lập luận chính trong bài đều dựa trên hiểu biết cá nhân của tôi. AI chủ yếu giúp tôi chỉnh sửa cách diễn đạt và bổ sung một vài ví dụ để phần giải thích dễ hiểu hơn.
