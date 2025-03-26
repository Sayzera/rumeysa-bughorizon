import { check } from "express-validator";

export const getValidationRules = (kurallar) => {
  return kurallar.map((kural) => {
    switch (kural.type) {
      case "required":
        return check(kural.field, `${kural.field} zorunludur`).not().isEmpty();
      case "minLength":
        return check(
          kural.field,
          `${kural.field} en az ${kural.deger} karakter uzunluğunda olmalıdır`
        ).isLength({ min: kural.deger });
      case "file":
        return check(kural.field, "Dosya geçerli bir dosya olmalıdır").custom(
          (deger, { req }) => {
            if (!req.files || Object.keys(req.files).length === 0) {
              throw new Error("Hiçbir dosya yüklenmedi.");
            }
            const dosya = req.files[kural.field];
            const izinVerilenUzantilar = new RegExp(
              kural.allowedExtensions.join("|")
            );
            const uzanti = dosya.name.split(".").pop().toLowerCase();
            if (!izinVerilenUzantilar.test(uzanti)) {
              throw new Error(
                `Sadece ${kural.izinVerilenUzantilar.join(
                  ", "
                )} dosyalarına izin verilir.`
              );
            }
            // size
            if (dosya.size > kural.maxSize) {
              throw new Error(
                `Dosya boyutu ${
                  kural.maxSize / (1024 * 1024)
                } MB'den küçük olmalıdır.`
              );
            }

            return true;
          }
        );
      default:
        return check(kural.field).exists(); // Varsayılan durum, fieldın var olduğunu kontrol eder
    }
  });
};
