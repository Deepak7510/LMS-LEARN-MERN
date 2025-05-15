import { uploadMediaService } from "@/service/media";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function CourseSettings({ form }) {
  const imageData = form.watch("image");

  async function handleFileChange(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadMediaService(formData);
    if (result.success) {
      form.setValue("image", {
        image_url: result.data.secure_url,
        public_id: result.data.public_id,
      });
    }
  }

  return (
    <Card className={"shadow-none"}>
      <CardHeader>
        <CardTitle className={"text-xl font-semibold"}>
          Course Setting
        </CardTitle>
      </CardHeader>
      <CardContent>
        {imageData && imageData.image_url ? (
          <img src={imageData.image_url} className="h-full w-full rounded-lg" />
        ) : (
          <div className=" space-y-2">
            <Label
              className={`${
                form.formState.errors?.image?.image_url ? "text-red-600" : ""
              }`}
            >
              Upload course image
            </Label>
            <Input
              className={`${
                form.formState.errors?.image?.image_url ? "border-red-600" : ""
              }`}
              type={"file"}
              onChange={handleFileChange}
              accept="image/*"
            />
            {form.formState.errors && form.formState.errors.image && (
              <p className="text-red-600">
                {form.formState.errors?.image?.image_url?.message}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CourseSettings;
