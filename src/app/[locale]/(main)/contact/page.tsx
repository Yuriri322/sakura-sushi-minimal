import { Card, Button } from '@/components/ui';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* How to Order Section */}
        <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t("howToOrder")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t("orderByPhone")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("orderByPhoneDesc")}
                </p>
                <a
                  href="tel:0876795204"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  {t("phoneNumber")}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{t("orderByEmail")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("orderByEmailDesc")}
                </p>
                <a
                  href="mailto:info@sakurasushi.bg"
                  className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {t("emailAddress")}
                </a>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("phone")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("phoneDescription")}
                  </p>
                  <a
                    href="tel:0876795204"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {t("phoneNumber")}
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("availableDuringHours")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t("email")}</h3>
                  <p className="text-muted-foreground mb-2">
                    {t("emailDescription")}
                  </p>
                  <a
                    href="mailto:info@sakurasushi.bg"
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    {t("emailAddress")}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {t("location")}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {t("locationDescription")}
                  </p>
                  <address className="not-italic text-lg">
                    {t("streetAddress")}
                    <br />
                    {t("city")}
                    <br />
                    {t("country")}
                  </address>
                  <Button variant="outline" className="mt-4" asChild>
                    <a
                      href="https://maps.google.com/?q=ул.+Д-р+Христо+Татарчев+33а,+Благоевград,+Bulgaria"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("getDirections")}
                    </a>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="w-full">
                  <h3 className="font-semibold text-lg mb-4">
                    {t("openingHours")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t("mondayToFriday")}
                      </span>
                      <span className="font-medium">
                        {t("mondayToFridayHours")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t("saturdaySunday")}
                      </span>
                      <span className="font-medium">
                        {t("saturdaySundayHours")}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t("lastOrderNote")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Order */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <div className="text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t("readyToOrder")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("readyToOrderDescription")}
                </p>
                <Button size="lg" asChild className="w-full">
                  <Link href="/menu">{t("viewMenu")}</Link>
                </Button>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t("faq")}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">{t("faqReservationQ")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("faqReservationA")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{t("faqPaymentQ")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("faqPaymentA")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{t("faqModifyOrderQ")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("faqModifyOrderA")}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">{t("faqCateringQ")}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t("faqCateringA")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t("followUs")}</h3>
              <p className="text-muted-foreground mb-4">
                {t("followUsDescription")}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://www.instagram.com/_sakura_blg?igsh=c2ticWgwMnJ1ZnB1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    {t("instagram")}
                  </a>
                </Button>
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-6 bg-muted">
              <h3 className="text-lg font-semibold mb-2">
                {t("needAssistance")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("needAssistanceDescription")}
              </p>
              <Button variant="default" size="lg" className="w-full" asChild>
                <a href="tel:0876795204">
                  <Phone className="h-4 w-4 mr-2" />
                  {t("callNow")}
                </a>
              </Button>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold mb-4">{t("findUs")}</h3>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=ул.+Д-р+Христо+Татарчев+33а,+Благоевград,+България&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sakura Sushi Location"
            />
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <address className="not-italic text-muted-foreground text-center sm:text-left">
              {t("streetAddress")}, {t("city")}
            </address>
            <Button variant="outline" asChild>
              <a
                href="https://maps.google.com/?q=ул.+Д-р+Христо+Татарчев+33а,+Благоевград,+Bulgaria"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("openInGoogleMaps")}
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}